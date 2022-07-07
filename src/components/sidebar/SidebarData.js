import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BaIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Translados',
    path: '/translados',
    icon: <FaIcons.FaCar />,
    cName: 'nav-text'
  },
  {
    title: 'Abastecimento',
    path: '/abastecimento',
    icon: <FaIcons.FaTachometerAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Veículo Motor',
    path: '/motor',
    icon: <BaIcons.BsGearFill />,
    cName: 'nav-text'
  },
  {
    title: 'Tipo Veículo',
    path: '/tipoVeiculo',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Undefined',
    path: '/Undefined',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];