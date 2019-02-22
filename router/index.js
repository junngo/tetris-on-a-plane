module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('tetris.html');
     });

    // GET ALL RECORDS
    app.get('/api/records', function(req,res){
        res.end();
    });

    // CREATE RECORD
    app.post('/api/records', function(req, res){
        res.end();
    });

    // UPDATE THE RECORD
    app.put('/api/records/:record_id', function(req, res){
        res.end();
    });

    // DELETE RECORD
    app.delete('/api/records/:record_id', function(req, res){
        res.end();
    });
    

    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });
}