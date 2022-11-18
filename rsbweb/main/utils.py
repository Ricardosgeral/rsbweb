
# Isto é independente do site.
# Rotina para colocar children=[] nos elementos sem children
# pega em regulamentos.json, modifica-o o conteúdo e grava o novo conteúdo em regulamentos_tree.json

import json

with open("../static/regulamentos.json", "r", encoding="utf-8") as f:
    data = json.load(f)


def add_child(obj):
    for child in obj["children"]:
        if "children" not in child:
            child["children"] = []
        else:
            add_child(child)

add_child(data)

# Serializing json
json_object = json.dumps(data, indent=1, ensure_ascii=False)

with open("../static/regulamentos_tree.json", "w", encoding="utf-8") as outfile:
    outfile.write(json_object)
