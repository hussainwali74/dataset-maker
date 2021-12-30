import os
import requests
import json
import time

# const file_name = `${speakername}-${speakerid}-${language_id}-${sentence.id}-${today.toDateString()}-${language_name}.wav`


def download(url, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)  # create folder if it does not exist

    # be careful with file names
    filename = url.split('/')[-1].replace(" ", "_")
    file_path = os.path.join(dest_folder, filename)

    # token of the user for who we want to get the sentences
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtamFkQGRzbWFrZXIuY29tIiwidXNlcl9pZCI6MywiaWF0IjoxNjM5OTAyMzEzLCJleHAiOjE2NDA3NjYzMTN9.yBqM7F8E_VIQwA5Ka2IRmUUlqed3l9g57scGM1J8Y8o"

    headersAuth = {
        'accept': '*/*',
        'Authorization': 'Bearer '+token
    }
    r = requests.get(url, headers=headersAuth, verify=False, stream=True)
    if r.ok:
        print("saving to", os.path.abspath(file_path))
        with open(file_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024 * 8):
                if chunk:
                    f.write(chunk)
                    f.flush()
                    os.fsync(f.fileno())
    else:  # HTTP status code 4XX/5XX
        print("Download failed: status code {}\n{}".format(r.status_code, r.text))

#download("https://roomie.pk:5000/Burushaski/Mukhtar Wali/Mukhtar Wali-4-1-40598-Tue Aug 24 2021-Burushaski.wav", dest_folder="mydir")


f = open("data.json")
data = json.load(f)

# print(data['data'][1]['recordedAudio'])
for j in data['data']:
    recordAudioArray = j['recordedAudio']

    for i in recordAudioArray:
        #print(i)
        if(i):
            audio_split = i.split("https://roomie.pk:5000/Burushaski/")
            print('downloading: ', i)
            print('into')
            speaker_name = audio_split[1].split('/')[0]
            sentence_id = audio_split[1].split('/')[1].split('-')[3]

            print('-----------------------------------------------')
            if(sentence_id):
                text_file_name = sentence_id+".txt"
                text_file_path = os.path.join(speaker_name, text_file_name)
                text_file = open(text_file_path, 'w+')
                text_file.write(j['sentence'])
                text_file.close()
            if(speaker_name != ''):
                download(i, dest_folder=speaker_name)
            else:
                print('folder name not valid')
                print(i)
                print('----------------------------------------------')
            time.sleep(1)
print("downloading done ")
