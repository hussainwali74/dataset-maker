## converts webm files to wav with proper RiFF headers
## place this file in main folder which contains other folders containing web files
#
#import subprocess
#
#import os
#import sys
#
#parent_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
#
#for subdir, dirs, files in os.walk(parent_dir):
#    i = 0
#    # get the path to your subparent_dir
#    folder_name = os.path.relpath(subdir, parent_dir)
#    # print(folder_name)
#    if(folder_name != '.'):
#        for filename in files:
#            i += 1
#            if filename.find('.wav') > 0:
#                # print(parent_dir)
#                # get the path to your subdirectory
#                subdirectoryPath = os.path.relpath(subdir, parent_dir)
#                # get the path to your file
#                filePath = os.path.realpath(
#                    os.path.join(subdirectoryPath, filename))
#                if(len(filename.split('_')) >= 2):
#                    filename = filename.split('_')[2]
#                    new_file_path = os.path.realpath(
#                        os.path.join(subdirectoryPath, filename))
#                    # print(filePath.split('/'))
#                    subprocess.call(['ffmpeg', '-i', filePath, filename])
#                    #os.remove(filePath)
#                else:
#                    temp_filename = 'kk'+filename
#                    new_file_path = os.path.realpath(
#                        os.path.join(subdirectoryPath, temp_filename))
#                    os.rename(filePath, new_file_path)
#
#                    subprocess.call(['ffmpeg', '-i', new_file_path, filePath])
#                    os.remove(new_file_path)

#copied from ubuntu
#dated: 28/01/2022
import subprocess

import os
import sys

parent_dir = os.path.dirname(os.path.realpath(sys.argv[0]))

for subdir, dirs, files in os.walk(parent_dir):
    i = 0
    # get the path to your subparent_dir
    folder_name = os.path.relpath(subdir, parent_dir)
    # print(folder_name)
    if(folder_name != '.'):
        for filename in files:
            i += 1
            if filename.find('.wav') > 0:
                # print(parent_dir)
                # get the path to your subdirectory
                subdirectoryPath = os.path.relpath(subdir, parent_dir)
                # get the path to your file
                filePath = os.path.realpath(
                    os.path.join(subdirectoryPath, filename))
                if(len(filename.split('_')) >= 2):
                    filename = filename.split('_')[2]
                    new_file_path = os.path.realpath(
                        os.path.join(subdirectoryPath, filename))
                    # print(filePath.split('/'))
                    subprocess.call(['ffmpeg', '-i', filePath, filename])
                    #os.remove(filePath)
                else:
                    temp_filename  = 'kk'+filename
                    new_file_path = os.path.realpath(
                        os.path.join(subdirectoryPath, temp_filename))
                    os.rename(filePath, new_file_path)

                    subprocess.call(['ffmpeg', '-i', new_file_path, filePath])
                    os.remove(new_file_path)
