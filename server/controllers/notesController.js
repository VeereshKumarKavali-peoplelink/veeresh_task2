const pool = require('../config/db');

exports.getAllNotes = async (req, res) => {
  const query = 'SELECT * FROM notes';
try {
    const [result] = await pool.query(query);  
   return res.status(200).json({data: result});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    if (content) {
      const query = 'INSERT INTO notes (content) VALUES (?)';
      const [insertResult] = await pool.query(query, [content]);
      const selectQuery = 'SELECT * FROM notes WHERE id = LAST_INSERT_ID()';
      const [rows] = await pool.query(selectQuery);
      return res.status(200).json({ data: rows[0] });
    }else{
      return res.status(400).json({ error: "Bad Request"});
    }
  } catch (err) {
     return  res.status(500).json({ error: err.message });
  }
};


exports.deleteNote =async (req, res) => {
  try {
    const { id } = req.params;
    if (id){
      const query = 'DELETE FROM notes WHERE id = ?';
      const [results] = await pool.query(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted" });
    }else{
      return res.status(400).json({ error: "Bad Request" });
    }
  }catch (err){
    return  res.status(500).json({ error: err.message });

  }
};