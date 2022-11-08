import json

# Opening JSON file
f = open("rsbweb/static/regulamentos.json", encoding="utf8")
# obter regulamentos
regs = json.load(f)
# Closing file
f.close()
