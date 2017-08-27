# dragToScroll.js

dragToScroll.js is a tiny js library helps simulate the vertical scroll movement from mobile to desktop.

## Getting Started

Include dragToScroll.js.
```
<script src="dragScroll.js"></script>
```

Call ScrollBody after the elements are created.
```
<script>ScrollBody(".scroll-body", {});</script>
```

## Demo
https://ivyip.github.io/dragToScroll/

## Options
You can try to override some default value by setting the options.
e.g:
```
<script>ScrollBody(".scroll-body", {scrollStep: 1, slideEnable: false});</script>
```

| Parameter | Description | Default |
| --- | --- | --- |
| scrollStep | The step of distance will be traveled if drag movement is detected | 1 |
| slideEnable | Whether a slide movement will occur if sliding prerequisites are met| true |
| slideDistanceMultiplier | The distance will be traveled if sliding prerequisites are met | 0.2 |
| slideDescending | The deceleration parameter of sliding | 1 |
| holdTimeThreshold | Slide movement will be triggered if time of holding mouse is shorter than this parameter | 30 |
| moveTimeThreshold | Slide movement will be triggered if the interval of moving mouse is shorter than this parameter when holding mouse down | 1000 |