const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM dragon', (err, filas) => {
            
            if (err){
                res.json(err);
                console.log('hay un error');
            }
            conn.query('SELECT * FROM powers', (err, filas2) => {
                if (err){
                    res.json(err);
                    console.log('hay un error');
                }
                //console.log('si funciona por ahora');
                //console.log(filas);
                //console.log(filas2);
                res.render('princ', {
                    data: filas,
                    datas: filas2
                });
            });
            /*
            console.log(filas);
            res.render('princ', {
                data: filas
            }); */
        });
    });
};

controller.save = (req, res) => {
    //console.log(req.body);
    //res.send('funciona uwu');
    const data = req.body;
    //object.key para las llaves 
    //object.values para los valores
    const datos = Object.values(data);
    //console.log('aqui el array uwu', datos);
    //console.log('aqui los datos',data);
    const primero = [datos[0],datos[1],datos[2]];
    const primero1 = {NameDragon:datos[0], AgeDragon:datos[1], PicDragon:datos[2]};
    const segundo = {MedioPowers:datos[3], MethodPowers:datos[4], PhisicPowers:datos[5], ElementhalPowers:datos[6]};
    //console.log('bueno aqui deberia decir namedragon = 0::::',primero1);
    //console.log('deberia mandar los primeros tres: ',primero);
    req.getConnection((err, conn) => {
        //console.log('aqui deberia estar el numero 0',data);
        
        conn.query('INSERT INTO dragon set ?', [primero1], (err, rows) => {
            console.log(rows);
            conn.query('INSERT INTO powers set ?', [segundo], (err2, rows2) => {
                
                console.log(rows2);
                res.redirect('/');
            });

            //console.log(rows);
            //res.redirect('/');
            //res.send('funciona si k si')
        });
    });
};

controller.edit = (req, res) => {
    const {id} = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM dragon WHERE idDragon = ?', [id], (err, rows) => {
            conn.query('SELECT * FROM powers WHERE idPowers = ?', [id], (err2, rows2) => {
                res.render('princ_edit', {
                    data: rows[0],
                    datas: rows2[0]
                });
            });
        });
    });
};

controller.update = (req, res) =>{
    const {id} = req.params;
    const newDates = req.body;
    const datos = Object.values(newDates);
    const primero = {NameDragon:datos[0], AgeDragon:datos[1], PicDragon:datos[2]};
    const segundo = {MedioPowers:datos[3], MethodPowers:datos[4], PhisicPowers:datos[5], ElementhalPowers:datos[6]};
    req.getConnection((er, conn) => {
        conn.query('UPDATE dragon Set ? WHERE idDragon = ?', [primero, id], (err, rows) => {
            conn.query('UPDATE powers Set ? WHERE idPowers = ?', [segundo, id], (err2, rows2) => {
                res.redirect('/')
            });
        });
    });
    
}; 

controller.delete = (req, res) => {
    const {id} = req.params;
    req.getConnection((err,conn) => {
        conn.query('DELETE FROM dragon WHERE idDragon = ?', [id], (err, rows) => {
            conn.query('DELETE FROM powers WHERE idPowers = ?', [id], (err, rows2) => {
                res.redirect('/');
            });
        });
    });
};

controller.guardars = (req, res) => {
    res.render('princ_guardar', {
        
    });
};
/*
controller.listp = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM dragon', (err, filas) => {
            
            if (err){
                res.json(err);
                console.log('hay un error');
            }
            conn.query('SELECT * FROM powers', (err, filas2) => {
                if (err){
                    res.json(err);
                    console.log('hay un error');
                }
                //console.log('si funciona por ahora');
                //console.log(filas);
                //console.log(filas2);
                res.render('princ', {
                    data: filas,
                    datas: filas2
                });
            });
            
            console.log(filas);
            res.render('princ', {
                data: filas
            }); 
        });
    });
};*/

controller.busca = (req, res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT NameDragon FROM dragon', (err, rows) => {
            conn.query('SELECT ElementhalPowers FROM powers', (err, rows2) => {
                conn.query('SELECT AgeDragon FROM dragon', (err, rows3) => {
                    conn.query('SELECT MethodPowers FROM powers', (err, rows4) => {
                        conn.query('SELECT PicDragon FROM dragon', (err, rows5) => {
                            conn.query('SELECT PhisicPowers FROM powers', (err, rows6) => {
                                conn.query('SELECT idDragon FROM dragon', (err, rows7) => {
                                    conn.query('SELECT idPowers FROM powers', (err, rows8) => {
                                        res.render('princ_busqueda', {
                                            data: rows,
                                            datas: rows2,
                                            data3: rows3,
                                            data4: rows4,
                                            data5: rows5,
                                            data6: rows6,
                                            data7: rows7,
                                            data8: rows8,
                                            
                                        });
                                    }); 
                                });
                            });
                        });
                    });
                });     
            });
        });
    });
};

module.exports = controller;
