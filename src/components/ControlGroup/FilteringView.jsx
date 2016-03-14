import React, { PropTypes } from "react";
import Select from "react-select";

const options = [
  { value: "Founder", label: "Founder" },
  { value: "Senior Management", label: "Senior Management" },
  { value: "Mentor/Advisor", label: "Mentor/Advisor" },
  { value: "Investor/Board of Director", label: "Investor/Board of Director" },
  { value: "Employee - Business", label: "Employee - Business" },
  { value: "Employee - Technology", label: "Employee - Technology" },
  { value: "Employee - Design", label: "Employee - Design" },
  { value: "Employee - Other", label: "Employee - Other" },
  { value: "Other", label: "Other" }
];

class FilteringView extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    entity: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="" />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <Select
          name="edge-filter"
          value=""
          options={options}
          onChange={this.logChange}
        />
      </div>
    );
  }

  onParamChange = (value) => {
    console.log(value);
  };
}

export default FilteringView;
