from bs4 import BeautifulSoup
import requests
import csv
import datefinder
import re
import dateutil
from datetime import datetime
import sys
import tweepy, time, sys
import lxml

CONSUMER_KEY = 'tClwWO7mTLmmXLoPvPa0WMbVt'
CONSUMER_SECRET = 'PbWfOVnWLua0Nv52SHBiV7aL7BDaa0jiw4RWbMfG1dVhdJfzko'
ACCESS_KEY = '858776811731394560-mJReLVQPvyvFYu6Zkmwn4BuYyIVzizH'
ACCESS_SECRET = '2Rqnj7zFrwGb2gdPGqjj3hmyHAUO7wImLyyZnM6o2WjP5'
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

reload(sys)
sys.setdefaultencoding('utf-8')

r  = requests.get("http://canada.pch.gc.ca/eng/rss?searchFilter=008")
data = r.text
soup = BeautifulSoup(data, "lxml")
containers = soup.findAll("item")
index1 = 0

# check the old file to see the most recent pubdate
with open('/var/www/flagscraper/flagscraper/static/flagdata2.csv', 'r') as oldfile:
	oldcsvcontent = csv.DictReader(oldfile, delimiter='|')
	for row in oldcsvcontent:
		oldpubdate = row['pubdate']

# write the new file, if there's been a new entry
with open('/var/www/flagscraper/flagscraper/static/flagdata2.csv', 'a') as csvfile:
	csvwriter = csv.writer(csvfile, delimiter="|")
	for i in containers:
		latestdate = containers[index1].find("pubdate").text.encode('utf-8').strip()
		break

	if (latestdate == oldpubdate):
		print "No new records."

	else:
		for i in reversed(containers):
			title = containers[index1].find("title").text.encode('utf-8').strip()
			pubdate = containers[index1].find("pubdate").text.encode('utf-8').strip()
			info = containers[index1].find("description").text.encode('utf-8').strip()
			newpubdate = dateutil.parser.parse(pubdate)

			# isolate masting period
			start = 'Period:'
			end = 'Occasion'
			s = info
			mastingperiod = s[s.find(start)+len(start):s.rfind(end)]

			# fix up period section / cut string off before passed away phrase
			split = mastingperiod.split("passed away",1)[0] 
			counter = 0

			#find instances of the date once or twice, join the months with the day
			for m in re.finditer('January |january |February |february |March |march |April |april |May |may |June |june |july |July |August |august |September |september |October |october |november |November |december |December ', split):
				counter+= 1
				date2 = "NA"
				split1 = split[m.start():m.end()]
				split2 = split[m.end():m.end() + 10]
				split3 = re.findall('\d+',split2)
				finaldate = split1 + ', '.join(split3)

				# create variables for the csv
				if (counter == 1):
					matches = datefinder.find_dates(finaldate)
					for match in matches:
						date1 = match.replace(year= newpubdate.year)
				else:
					matches = datefinder.find_dates(finaldate)
					for match in matches:
						date2 = match.replace(year= newpubdate.year)
						
			# isolate occasion
			start1 = 'Occasion :'
			end1 = 'Masting location'
			occasion = s[s.find(start1)+len(start1):s.rfind(end1)]

			# isolate locations
			start2 = 'Masting location(s):'
			end2 = 'Additional'
			location = s[s.find(start2)+len(start2):s.rfind(end2)]

			# how to get the section number by itself
			section = containers[index1].findAll("a")

			# get the section links
			for link in section:
				linktitle = link.text

			# if more than one section or and, make variable be called multiple. otherwise just get the section by itself
			if (len(section) > 1) or ("and" in linktitle) or ("Sections" in linktitle) or ("And" in linktitle) or ("&" in linktitle):
				sectionno = "Multiple"
			else:
				sectionno = re.sub("[^0-9]", "", linktitle)

			year = str(date1.year)

			# write to the CSV
			csvwriter.writerow([title, pubdate, mastingperiod, occasion, location, sectionno, date1, date2, year])

			# tweet bots
			func = lambda s: s[:1].lower() + s[1:] if s else ''

			tweet = "Flags will be at half mast for: " + title 
			link2 = "http://halfmast.ca"
			tweetfinal = tweet[:113] + "... " + link2
			# api.update_status(status=tweetfinal)

			# iterate
			index1+=1
			break


