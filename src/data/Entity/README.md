

for i in *.json; do mv $i `egrep -m1 -e '\"id\":\"c:[0-9]\"*' $i | sed -E 's/{\"id\":\"c:([0-9]+).*/\1.json/'`; done

for i in *.json; do mv $i `egrep -m1 -e '\"id\":\"p:[0-9]\"*' $i | sed -E 's/{\"id\":\"p:([0-9]+).*/\1.json/'`; done
