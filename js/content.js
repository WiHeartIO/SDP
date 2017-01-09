
function getContent(id){
	switch(id){
		case 'btnA':
			return "<h3>Scenario A</h3><br>Small storage capacity (Rj=300 kwh) with small" +
			" variance of wind power to battery storage N(900,100) under a Beta (α,β) process" +
			" unmet commitment (kwh):<br><br>" +
			"Achieve three energy storage peaks under a smaller storage level, and small value of " +
			"commitment decisions per day. The energy storage peaks are morning, afternoon and midnight of each day." + 
			"<br><image src='image/scenarioA-zt.png'><br>" + 
			"<image src='image/scenarioA-xti.png'><br>" + 
			"<image src='image/scenarioA-vt.png'><br>";
		case 'btnB':
			return "<h3>Scenario B</h3><br>Medium storage capacity (Rj=600 kwh) with small variance" +
			" of wind power to battery storage N(900,100) under a Beta(α,β) process unmet commitment (kwh):" +
			"<br><br>Achieve two energy storage peaks under medium storage level, and medium value of commitment" +
			" decisions per day. The energy storage peaks are noon and midnight of each day." + 
			"<br><image src='image/scenarioB-zt.png'><br>" + 
			"<image src='image/scenarioB-xti.png'><br>" + 
			"<image src='image/scenarioB-vt.png'><br>";
		case 'btnC':
			return "<h3>Scenario C</h3><br>Large storage capacity (Rj=900 kwh) with small variance of " + 
			"wind power to battery storage N(900,100) under a Beta (α,β) process unmet commitment (kwh):<br><br>" +
			"Achieve one energy storage peak under a smaller storage level, and larger value of commitment " +
			"decisions per day. The energy storage peak is midnight of each day." +
			"<br><image src='image/scenarioC-zt.png'><br>" + 
			"<image src='image/scenarioC-xti.png'><br>" + 
			"<image src='image/scenarioC-vt.png'><br>";
		case 'btnD':
			return "<h3>Scenario D</h3><br>Small storage capacity (Rj=300 kwh) with large variance of wind power" +
			" to battery storage N(900,500) under a Beta (α,β) process unmet commitment (kwh):<br><br>" +
			"Almost achieve maximum storage level every day. "+
			"The larger variance of wind power to battery storage produces a greater and more harmonious value of " + 
			"commitment decisions and operating value per day. " +
			"<br><image src='image/scenarioD-zt.png'><br>" + 
			"<image src='image/scenarioD-xti.png'><br>" + 
			"<image src='image/scenarioD-vt.png'><br>";
		case 'btnE':
			return "<h3>Scenario E</h3><br>Medium storage capacity (Rj=600 kwh) with large variance of wind power" +
			" to battery storage N(900,500) under a Beta (α,β) process unmet commitment (kwh):<br><br>" + 
			"Almost but sparsely achieve maximum storage level every day. " +
			"The larger variance of wind power to battery storage produces a greater and more harmonious value of commitment" +
			" decisions and operating value per day. "+
			"<br><image src='image/scenarioE-zt.png'><br>" + 
			"<image src='image/scenarioE-xti.png'><br>" + 
			"<image src='image/scenarioE-vt.png'><br>";
		case 'btnF':
			return "<h3>Scenario F</h3><br>Large storage capacity (Rj=900 kwh) with large variance of wind power to battery " +
			"storage N(900,500) under a Beta (α,β) process unmet commitment (kwh):<br><br>" +
			"Almost but even more sparsely achieve maximum storage level every day. " +
			"The larger variance of wind power to battery storage produces a greater and "+
			"more harmonious value of commitment decisions and operating value per day.  " +
			"<br><image src='image/scenarioF-zt.png'><br>" + 
			"<image src='image/scenarioF-xti.png'><br>" + 
			"<image src='image/scenarioF-vt.png'><br>";
	}
}