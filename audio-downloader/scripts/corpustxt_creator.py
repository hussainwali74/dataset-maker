# corpus.txt contains all the sentences 417,
#this should be in kaldi/egs/burushaski/data/local
import os
import sys
#get the directory of your script
directory = os.path.dirname(os.path.realpath(sys.argv[0]))


f = open('corpus.txt', 'w+')

for subdir, dirs, files in os.walk(directory):
    for filename in files:
        ##get the path to your subdirectory
        # folder is the speakerID and it is the subdirectory
        speakerId = os.path.relpath(subdir, directory)

        #get the path to you file
        file_path = os.path.join(subdir, filename)
        print(file_path)
        uterranceID = filename.split('.')[0]
        if(speakerId and '.txt' in file_path):
            f2 = open(file_path, 'r')
            file_content = f2.read()
            #folder_file_name filecontent
            line = file_content + '\n'
            print(line)
            f.write(line)
            f2.close()

f.close()
