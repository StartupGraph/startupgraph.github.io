import d3 from "d3";
import { updateNetworkGraphData } from "redux/Actions";
import Store from "redux/Store";

const srcObject = {
  nodes: [
    {
      url: require("data/NetworkGraph/nodes_person.csv"),
      rowParser: ({ id, name, relations }) => ({ id, name, relations: +relations, type: "person" })
    },
    {
      url: require("data/NetworkGraph/nodes_company.csv"),
      rowParser: ({ id, name, logo, logoAspectRatio, relations }) =>
        ({ id, name, logo, logoAspectRatio: +logoAspectRatio, relations: +relations, type: "company" })
    }
  ],
  links: [
    {
      url: require("data/NetworkGraph/links_person_company.csv"),
      rowParser: ({ person, company, title, type }) =>
        ({ source: person, target: company, title, type })
    }
  ]
};

const force = d3.layout.force();
const rawData = { nodes: [], links: [] };

function createPromise(src) {
  if (typeof src.nodes === "undefined" || !Array.isArray(src.nodes) ||
      typeof src.links === "undefined" || !Array.isArray(src.links)) {
    throw new TypeError("loadCSV() called with wrong argument type");
  }
  const nodeRequests = src.nodes.map(obj =>
    new Promise((resolve, reject) => {
      d3.csv(obj.url).row(obj.rowParser).get((error, rows) => {
        if (error) reject(error); else resolve({ type: "node", data: rows });
      });
    }));
  const linkRequests = src.links.map(obj =>
    new Promise((resolve, reject) => {
      d3.csv(obj.url).row(obj.rowParser).get((error, rows) => {
        if (error) reject(error); else resolve({ type: "link", data: rows });
      });
    }));
  return [].concat(nodeRequests, linkRequests);
}

export function onDrag(nodeId, { x, y }) {
  force.resume();
  rawData.nodes.forEach(n => {
    if (n.id === nodeId) n = { ...n, x, y, px: n.x, py: n.y };
  });
}

export function initBackingForceInstance(width, height) {
  force.size([ width, height ])
    .charge(n => n.type === "person" ? -300 : (Math.log(n.relations) * -150 - 300))
    .gravity(0.5);
  Promise.all(createPromise(srcObject)).then(values => {
      values.forEach(result => {
        switch (result.type) {
          case "node": rawData.nodes = rawData.nodes.concat(result.data); break;
          case "link": rawData.links = rawData.links.concat(result.data); break;
          default: throw new TypeError("Promise result has wrong type.");
        }
      });

      const nodeById = d3.map();
      rawData.nodes.forEach(node => { nodeById.set(node.id, node); });
      rawData.links = rawData.links.map(link => ({
        source: nodeById.get(link.source),
        target: nodeById.get(link.target),
        title: link.title,
        type: link.type
      }));

      force.nodes(rawData.nodes).links(rawData.links).start();
      force.on("tick", () => {
        if (!Store.getState().networkGraphData.isFetching) {
          Store.dispatch(updateNetworkGraphData(rawData));
        }
      });
      force.on("end", () => {
        Store.dispatch(updateNetworkGraphData(rawData));
      });
    }, error => { throw new Error(error); });
}

export function setSize(width, height) {
  force.size([ width, height ]).resume();
}
