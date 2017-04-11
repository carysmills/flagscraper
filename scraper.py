from bs4 import BeautifulSoup
import requests
import csv
import datefinder
import re

r  = requests.get("http://canada.pch.gc.ca/eng/1461849633127")
data = r.text
soup = BeautifulSoup(data)
containers = soup.findAll("div", { "class" : "well" })
inner = soup.findAll("div", class_="col-md-9")
index1 = 0 
date2 = "NA"

#open CSV and tell it how to write to it
with open('flagdata.csv', 'w') as csvfile:
	csvwriter = csv.writer(csvfile, delimiter="|")
	csvwriter.writerow(["period","occasion","location","details","sectionno","date1","date2"])

	# for each one of the wells containers
	for wells in containers:   
		period = containers[index1].findAll("div", class_="col-md-9")[0].text.encode('utf-8').strip()
		occasion = containers[index1].findAll("div", class_="col-md-9")[1].text.encode('utf-8').strip()
		location = containers[index1].findAll("div", class_="col-md-9")[2].text.encode('utf-8').strip()
		details = containers[index1].findAll("div", class_="col-md-9")[3].text.encode('utf-8').strip()

		#get date by itself
		#cut string off before passed away phrase
		split = period.split("passed away",1)[0] 
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
					date1 = match
			else:
				matches = datefinder.find_dates(finaldate)
				for match in matches:
					date2 = match
					print "Hagerman" in details
					if "Hagerman" in details:
						import pdb
						pdb.set_trace()
					date1 = date1.replace(year=date2.year)

		# how to get the section number by itself
		section = containers[index1].findAll("div", class_="col-md-9")[3].findAll("a")

		# get the section links
		for link in section:
		    title = link.text

		# if more than one section or and, make variable be called multiple. otherwise just get the section by itself
		if (len(section) > 1) or ("and" in title) or ("And" in title) or ("&" in title):
			sectionno = "multiple"
		else:
			start = 'ection'
			end = ') '
			s = title
			sectionno = s[s.find(start)+len(start):s.rfind(end)]
 
		#write our info to CSV
		csvwriter.writerow([period, occasion, location, details, sectionno, date1, date2])

		index1 += 1





