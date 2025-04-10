## To install the dependency

### `npm install`

## To run the app

### `npm start`

## To run the test case

### `npm test`

|---------------------|------------------------------|
|  Dependency Array   |        When it Runs          |
|----------------------------------------------------|
|  []	              |        Only once (on mount)  |
|----------------------------------------------------|
|  [value]            |    	When value changes       |
|----------------------------------------------------|
|  Nothing	          |        Every render          |
|----------------------------------------------------|
| return () => {}	  |        Cleanup (unmount)     |
-----------------------------------------------------|