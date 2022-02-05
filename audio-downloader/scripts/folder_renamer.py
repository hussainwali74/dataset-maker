# rename folders to this format
#02ali_tahir-20160925-abj
# updated 29/01/2022

import os
import sys
import datetime


def getWholeToAttach(num):
    num_to_attach = ''
    if(num > 0 and num < 10):
        num_to_attach = '0'+str(num)
    else:
        num_to_attach = str(num)
    return num_to_attach

# get the directory of your script
directory = os.path.dirname(os.path.realpath(sys.argv[0]))
i = 0
year = str(datetime.datetime.today().year)
month = str(datetime.datetime.today().month)
day = str(datetime.datetime.today().day)



for subdir, dirs, files in os.walk(directory):
    # get the path to your subdirectory
    old_folder_name = os.path.relpath(subdir, directory)
    oldfoldername_split = old_folder_name.split(' ')
    new_folder_name = ''
    if(len(oldfoldername_split) > 1 and old_folder_name != '.'):
        new_folder_name = getWholeToAttach(
            i)+'_'.join(oldfoldername_split)+'-'+year+getWholeToAttach(month)+getWholeToAttach(day)+'-abj'
        i += 1
    elif (old_folder_name != '.'):

        new_folder_name = getWholeToAttach(
            i)+old_folder_name+'-'+year+getWholeToAttach(month)+getWholeToAttach(day)+'-abj'
        i += 1
    if(old_folder_name != '.'):
        if(new_folder_name != old_folder_name):
            if not os.path.exists(new_folder_name):
                os.rename(old_folder_name, new_folder_name)
