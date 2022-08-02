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
    icon: <FaIcons.FaCarBattery />,
    cName: 'nav-text'
  },
  {
    title: 'Tipo Veículo',
    path: '/tipoVeiculo',
    icon: <FaIcons.FaCaravan />,
    cName: 'nav-text'
  },
  {
    title: 'Veiculo Marca',
    path: '/veiculoMarca',
    icon: <FaIcons.FaCarSide />,
    cName: 'nav-text'
  },
  {
    title: 'Posto Combustível',
    path: '/postoCombustivel',
    icon: <FaIcons.FaGasPump />,
    cName: 'nav-text'
  },
  {
    title: 'Veiculos',
    path: '/veiculos',
    icon: <FaIcons.FaCarSide />,
    cName: 'nav-text'
  }
];