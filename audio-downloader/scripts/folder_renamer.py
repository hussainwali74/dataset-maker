import os
import sys
# get the directory of your script
directory = os.path.dirname(os.path.realpath(sys.argv[0]))

for subdir, dirs, files in os.walk(directory):
    # get the path to your subdirectory
    old_folder_name = os.path.relpath(subdir, directory)
    oldfoldername_split = old_folder_name.split(' ')
    new_folder_name = ''
    # print(oldfoldername_split)
    if(len(oldfoldername_split) > 1 and old_folder_name != '.'):
        print('old_folder_name', old_folder_name)
        print('old_folder_name check : ', old_folder_name == '.')
        new_folder_name = new_folder_name.join(oldfoldername_split)
    else:
        new_folder_name = old_folder_name
    print('new_folder_name', new_folder_name)
    if(new_folder_name != old_folder_name):
        if not os.path.exists(new_folder_name):
            os.rename(old_folder_name, new_folder_name)
