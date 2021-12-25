# THIS FILE MAKES THE API REQUEST TO roomie.pk AND GETS THE LIST OF SENTENCES ALONG WITH AUDIO LINKS
# Authorization data
import requests

import json

# token of the user for who we want to get the sentences
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtamFkQGRzbWFrZXIuY29tIiwidXNlcl9pZCI6MywiaWF0IjoxNjM5OTAyMzEzLCJleHAiOjE2NDA3NjYzMTN9.yBqM7F8E_VIQwA5Ka2IRmUUlqed3l9g57scGM1J8Y8o"

headersAuth = {
    'accept': '*/*',
    'Authorization': 'Bearer '+token
}
url = "https://roomie.pk:5000/sentence/allsample/language/1"
response = requests.get(url, headers=headersAuth, verify=False)
data = response.json()
with open(name='data.json', mode='w') as f:
    json.dump(data, f, indent=4)
print('done')
# ---------------------------------------------------------------
