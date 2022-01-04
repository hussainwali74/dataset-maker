import os
import sys

# get the directory of your script
directory = os.path.dirname(os.path.realpath(sys.argv[0]))
for subdir, dirs, files in os.walk(directory):
    for filename in files:
        if filename.find('.wav') > 0:
            # get the path to your subdirectory
            subdirectoryPath = os.path.relpath(subdir, directory)
            # get the path to your file
            filePath = os.path.join(subdirectoryPath, filename)
            print("filePath")
            print(filePath)
            print("filename")
            print(filename)
            if(len(filePath.split('\\') >= 1)):
                if(len(filePath.split('\\')[1].split('-')) >= 3):
                    new_file_name = filePath.split(
                        '\\')[1].split('-')[3]+".wav"
                    print(new_file_name)
                    new_file_path = os.path.join(
                        filePath.split('\\')[0], new_file_name)
                    print("new_file_path")
                    print(new_file_path)
                    print("-----------------------------------")
                    file_exists = os.path.exists(new_file_path)
                    if(file_exists == False):
                        os.rename(filePath, new_file_path)  # rename your file
