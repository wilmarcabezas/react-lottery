import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Tooltip } from 'antd';


const LotteryNumbers = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [dataSaved, setDataSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(null);
  const [formData, setFormData] = useState({
    number:"",
    name: "",
    email: "",
    phone: "",
    paymentStatus:"",
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
    <div className="flex flex-wrap">
      {lotteryData
        .sort((a, b) => a.numberticket - b.numberticket)
        .map((item, index) => (
          <>
            {item.status === "sold out" ?
              <Tooltip title="Vendido">
                <button key={item.id} disabled className="bg-red-500 text-center text-white m-2 w-1/20 sm:w-1/10 md:w-1/10">
                  {item.numberticket}
                </button>
              </Tooltip>
              :
              <button key={item.numberticket} onClick={() => handleButtonClick(item.numberticket)} className="bg-green-500 text-white m-2 w-1/20 sm:w-1/10 md:w-1/10">
                {item.numberticket}
              </button>
            }
            {(index + 1) % 10 === 0 && <br />}
          </>
        ))}
      <Modal
        title={`Número seleccionado: ${clickedNumber}`}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <form>
          <label>
            Nombre:
            <input type="text" name="name" onChange={handleChange} value={formData.name} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} value={formData.email} />
          </label>
          <br />
          <label>
            Teléfono:
            <input type="tel" name="phone" onChange={handleChange} value={formData.phone} />
          </label>
        </form>
      </Modal>
    </div>
  );
}
export default LotteryNumbers;
