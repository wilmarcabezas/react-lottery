import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Tooltip } from 'antd';

const LotteryNumbers = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(null);

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
  }, []);

  const handleButtonClick = (number) => {
    setClickedNumber(number);
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <div>
      {lotteryData.map((item, index) => (
        <>
          {item.status === "sold out" ?
            <Tooltip title="Vendido">
              <button key={item.numberticket} disabled style={{ backgroundColor: '#FF0000', margin: '5px'}}>
                {item.numberticket}
              </button>
            </Tooltip>
            :
            <button key={item.id} onClick={() => handleButtonClick(item.numberticket)} style={{ backgroundColor: '#00FF00', margin: '5px'}}>
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
        footer={null}
      >
        <form>
          <label>
            Nombre:
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <label>
            Teléfono:
            <input type="tel" name="phone" />
          </label>
        </form>
      </Modal>
    </div>
  );
}

export default LotteryNumbers;
