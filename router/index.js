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
        Record.findById(req.params.record_id, function(err, record){
            if(err)
                return res.status(500).json({ error: 'database failure' });
            if(!record)
                return res.status(404).json({ error: ' record not found' })
           
            if(req.body.user)
                record.user = req.body.user;
            if(req.body.score)
                record.score = req.body.score;
            if(req.body.published_date) 
                record.published_date = req.body.published_date;
            
            record.save(function(err){
                if(err) 
                    res.status(500).json({error: 'failed to update'});
                
                    res.json({message: 'record updated'});
            });
                
        });

    });

    // DELETE RECORD
    app.delete('/api/records/:record_id', function(req, res){
        Record.remove({ _id: req.params.record_id }, function(err, output){
            if(err)
                return res.status(500).json({ error: "database failure" });

            res.status(204).end();
        })
    });
    

    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });
}