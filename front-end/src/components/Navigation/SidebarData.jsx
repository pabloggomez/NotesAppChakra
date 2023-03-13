import React from 'react';
import {
    FiHome
  } from 'react-icons/fi';
  import {
    HiOutlineDocumentAdd
  } from 'react-icons/hi';
import {
    RiArchiveDrawerLine
} from 'react-icons/ri'
export const SidebarData = [
    { name: 'Home', icon: FiHome, path:'/' },
    { name: 'Create Note', icon: HiOutlineDocumentAdd, path: '/create' },
    { name: 'Archived Notes', icon: RiArchiveDrawerLine, path: '/archived'}
];
      
