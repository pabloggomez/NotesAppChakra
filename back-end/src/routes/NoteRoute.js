import express from 'express';
const router = express.Router();

//importing controllers
import noteController from "../controllers/NoteController.js";


router.get('/testdata',noteController.testdata);
router.post('/createNote',noteController.createNote);
router.get('/list',noteController.list );
router.get('/getArchivedNotes',noteController.getArchivedNotes);
router.get('/getNote/:id',noteController.getNote );
router.put('/updateNote',noteController.updateNote);
router.put('/archiveNote/:id/:value',noteController.archiveNote);
router.delete('/deleteNote/:id',noteController.deleteNote);
router.get('/save',(req,res)=>{
    res.json({status:"Note saved successfully"});
});
router.get('/listTags',noteController.listTags);
export default router;