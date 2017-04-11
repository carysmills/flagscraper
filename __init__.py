from flask import Flask, render_template
import csv
from datetime import datetime
app = Flask(__name__)


def is_current_date(date1, date2):
	dateformat = '%Y-%m-%d %H:%M:%S'
	today = datetime.today()
	if date2 == 'NA':
		return datetime.strptime(date1, dateformat).date() == today.date()
	else: 
		return datetime.strptime(date1, dateformat) < today < datetime.strptime(date2, dateformat)


@app.route('/')
def main():

	blob = []

	with open('flagdata2.csv', 'r') as csvfile:
		csvcontent = csv.DictReader(csvfile, delimiter='|')
		for row in csvcontent:
			row = {key: unicode(value, 'utf-8') for key, value in row.iteritems()}
			row['happening'] = is_current_date(row['date1'], row['date2'])
			row['currentyear'] = str(datetime.today().year)
			blob.append(row)

	blob = sorted(blob, key=lambda blob: (blob["happening"], blob["date1"]), reverse=True)
	return render_template('index.html', rows=blob)

if __name__ == '__main__':
	app.run(debug = True, use_reloader = True)