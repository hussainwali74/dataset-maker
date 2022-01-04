import os
import sys
#get the directory of your script
directory = os.path.dirname(os.path.realpath(sys.argv[0]))
f = open('wav.scp', 'w+')

for subdir, dirs, files in os.walk(directory):
    for filename in files:
        #get the path to your subdirectory
        subdirectory_path = os.path.relpath(subdir, directory)
        #get the path to you file
        file_path = os.path.join(subdir, filename)
        print('foldername', subdirectory_path)
        print('file_path', file_path)
        if(subdirectory_path and '.wav' in file_path):
            line = subdirectory_path+' '+file_path + '\n'
            f.write(line)
            print('----------------------------------------')
f.close()
