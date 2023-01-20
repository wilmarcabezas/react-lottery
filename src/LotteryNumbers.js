import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Tooltip } from 'antd';


const LotteryNumbers = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [dataSaved, setDataSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    email: "",
    phone: "",
    paymentStatus: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fuq296ams3.execute-api.us-east-1.amazonaws.com/dev/get/lotterydata');
        setLotteryData(res.data.sort((a, b) => a.number - b.number));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dataSaved]);

  const handleButtonClick = (number) => {
    setClickedNumber(number);
    setFormData({
      ...formData,
      number: number,
      paymentStatus: "sold out"
    });

    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const handleOk = async () => {
    try {

      console.log(formData)

      await axios.post('https://fuq296ams3.execute-api.us-east-1.amazonaws.com/dev/register', formData);
      setVisible(false);
      setDataSaved(!dataSaved);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="bg-center items-center justify-center bg-fit bg-no-repeat min-w-screen min-h-screen w-full" 
    style={{ backgroundImage: "url(https://www.myltdexpress.com/images/camara.jpeg)" }}>
      <h1 className="text-center text-4xl font-medium leading-tight text-gray-800">Gana una grandiosa cámara.</h1>
      <h1 className="text-center text-4xl font-medium leading-tight text-orange-500">Juega el 22 de febrero con las 2 últimas cifras de la lotería del Meta</h1>
      {lotteryData
        .sort((a, b) => a.numberticket - b.numberticket)
        .map((item, index) => (
          <>
            {item.status === "sold out" ?
              <Tooltip title="Vendido">
                <button key={item.id} disabled className="bg-red-500 text-center text-white m-2 p-2 w-1/20 sm:w-1/10 md:w-1/10 rounded-lg">
                  {item.numberticket}
                </button>
              </Tooltip>
              :
              <button key={item.numberticket} onClick={() => handleButtonClick(item.numberticket)} className="bg-green-500 m-2 p-2 text-white  w-1/20 sm:w-1/10 md:w-1/10 rounded-lg">
                {item.numberticket}
              </button>
            }
            {/* {(index + 1) % 10 === 0 && <br />} */}
          </>
        ))}
      <Modal
        title={`Número seleccionado: ${clickedNumber}`}
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button className="bg-green-500 text-white px-4 rounded-lg" onClick={handleOk}>Guardar</Button>,
          <Button className="bg-red-500 text-white px-4 rounded-lg" onClick={handleCancel}>Cancelar</Button>
        ]}
      >
        <form className="p-4 border rounded-md bg-white flex ">
          <label className="block font-medium text-sm mb-2">
            Nombre:
            <input className="w-full border rounded-md p-2" type="text" name="name" onChange={handleChange} value={formData.name} />
          </label>
          <label className="block font-medium text-sm mb-2">
            Email:
            <input className="w-full border rounded-md p-2" type="email" name="email" onChange={handleChange} value={formData.email} />
          </label>
          <label className="block font-medium text-sm mb-2">
            Teléfono:
            <input className="w-full border rounded-md p-2" type="tel" name="phone" onChange={handleChange} value={formData.phone} />
          </label>
        </form>
       </Modal>
    </div>
  );
}
export default LotteryNumbers;
