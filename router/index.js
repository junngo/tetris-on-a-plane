module.exports = function(app, Record)
{
     app.get('/',function(req,res){
        res.render('tetris.html');
     });

    // GET ALL RECORDS
    app.get('/api/records', function(req,res){
        Record.find(function(err, records){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(records);
        })
    });

    // CREATE RECORD
    app.post('/api/records', function(req, res){
        var record = new Record();
        record.user = req.body.user;
        record.score = req.body.score;
        record.published_date = new Date(req.body.published_date);

        record.save(function(err){
            if(err){
                console.log(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});
        });
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