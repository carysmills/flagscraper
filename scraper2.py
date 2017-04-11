from bs4 import BeautifulSoup
import requests
import csv
import datefinder
import re
import dateutil
from datetime import datetime
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

r  = requests.get("http://canada.pch.gc.ca/eng/rss?searchFilter=008")
data = r.text
soup = BeautifulSoup(data)
containers = soup.findAll("item")
index1 = 0
date2 = "NA"

with open('flagdata2.csv', 'w') as csvfile:
	csvwriter = csv.writer(csvfile, delimiter="|")
	csvwriter.writerow(["title", "pubdate", "mastingperiod", "occasion", "location", "section", "date1", "date2", "year"])

	for i in containers:
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
		for m in re.finditer('January |january |February |february |March |march |April |april |May |may |June |june |july |July |August |august |September |september |October |october |november |November |december |December ', split):          #
			counter+= 1
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

		# iterate
		index1+=1




