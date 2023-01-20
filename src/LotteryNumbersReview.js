import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Tooltip } from 'antd';


const LotteryNumbersReview = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [dataSaved, setDataSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fuq296ams3.execute-api.us-east-1.amazonaws.com/dev/get/lotteryticket');
        setLotteryData(res.data.sort((a, b) => a.number - b.number));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dataSaved]);

  const handleDelete = async (number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        setFormData({
          ...formData,
          number: number,
        });
        console.log(formData);
        await axios.delete(`https://fuq296ams3.execute-api.us-east-1.amazonaws.com/dev/delete?number=${number}`, formData);
        setDataSaved(!dataSaved);
      } catch (error) {
        console.log(error);
      }
    }
  }
  

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap">
              {lotteryData
                .sort((a, b) => a.numberticket - b.numberticket)
                .map((item, index) => (
                  <div key={item.numberticket} className="bg-green-500 m-4 p-4 text-white  w-full sm:w-1/2 md:w-1/4 rounded-lg">
                  <div className="text-4xl">Número: {item.numberticket}</div>
                  <div className="">Nombre: {item.nameperson}</div>
                  <div className="">Teléfono: {item.phone}</div>
                  <div className="">Email: {item.email}</div>
                  <button onClick={() => handleDelete(item.numberticket)} className="bg-red-500 text-center p-2 rounded-lg text-white">Eliminar</button>
                </div>
                ))}
            </div>
  );
}
export default LotteryNumbersReview;
