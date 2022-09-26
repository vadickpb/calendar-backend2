const { response } = require('express')
const Evento = require('../models/Evento')

const getEvents = async (req, res = response) => {
  try {
    const eventos = await Evento.find()
      .populate('user', 'name')

    res.status(200).json({
      ok: true,
      eventos
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }
}

const creaTeEvent = async (req, res) => {
  const evento = new Evento(req.body)
  try {
    evento.user = req.uid
    const eventoGuardado = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventoGuardado
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }
}

const updateEvent = async(req, res) => {
  const eventId = req.params.id;
  const evento = await Evento.findById(eventId);
  const uid = req.uid;

  try {
    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'no se encontró el evento'
      })
    }

    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'el usuario no esta autorizado a actualizar este evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }
    const eventUpdated = await Evento.findByIdAndUpdate(eventId, newEvent, { new: true })

    res.status(201).json({
      ok: true,
      eventUpdated
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: true,
      msg: 'hable con el administrador'
    })
  }

}

const deleteEvent = async(req, res) => {

  const eventId = req.params.id
  const evento = await Evento.findById(eventId)
  const uid = req.uid

  try {
    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'no se encontró el evento'
      })
    }
  
    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'usted no esta autorizado a eliminar este evento'
      })
    }
    await Evento.findByIdAndDelete(eventId)
    res.status(200).json({
      ok: true,
    })
    
  } catch (error) {
    console.log(error); 
    res.status(400).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }

}


module.exports = {
  getEvents,
  creaTeEvent,
  updateEvent,
  deleteEvent
}