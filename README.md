# Energy Flow Optimization 

This project applies stochastic dynamic programming to simulate energy flow optimization for wind farm. The algorithms is based on day ahead wind commitment scenario, which aims to maximize profit of the energy storage system in specified days, 24 hours.

We refer to paper `Approximate Dynamic Programming for Storage Problems`(2011) published by Lauren A. Hannah and David B. Dunson in Duke University(USA).

# Author

* Wayne Hung (juh296@psu.edu)
* Veck Hsiao (fbukevin@gmail.com)

# Develop Note
* JavaScript Visualization Library:
	* 3D 是用這個：http://almende.github.io/chap-links-library/js/graph3d/doc/<br>
	(應該是改 http://javascript-surface-plot.googlecode.com/…/googleVizAp…)<br>
	(tooltip: http://almende.github.io/chap-links-library/js/graph3d/doc/…)
	* 2D 是用這個：http://www.flotcharts.org/f…/examples/interacting/index.html

* graph3d 的 basic 中 data: `data.addRow([x, y, value]);`，可以對應到 zt 和 xti 的 [day, hr, value]

* sum()
	```
	vector = [[1, 2], [3, 4]]
	wayne 說 sum(vector, 1) 是 jStat(vector).sum() == [4, 6]
	sum(vector, 2) 應等於 [3, 7]，但 jStat 沒有這個實作
	```
	
* code optimization
	1. rev, fu, fd 的 N, t 直接用 global?
