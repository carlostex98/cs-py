const express = require('express');
const aps = express();

aps.set('port', '8000');
app.set('view engine', 'ejs');

aps.use(require('./routes/index_route'));



aps.listen(aps.get('port'), function () {
    console.log('Example app listening on port', aps.get('port'));
});