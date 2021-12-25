import json
import sys
import io

#sys.stdout = io.open(sys.stdout.fileno(), 'w', encoding='utf8')
f = open('data.json')
data = json.load(f)
x = {}
for i in data['data']:
    x = i
    print(x['sentence'])

f.close()
