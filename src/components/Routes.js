import React from 'react';

import Home from './pages/home/HomePage'
import Info from './pages/info/Info'
import ToDo from './pages/todo/ToDo'
import Works from './pages/works/Works'
import Contacts from './pages/contacts/Contacts'
import About from './pages/about/About'
import Blog from './pages/blog/Blog'
import { Guitar } from './pages/guitar/Guitar'

let Routes = {
	'Info': <Info/>,
	'Todo': <ToDo/>,
	'Works': <Works/>,
	'Contacts': <Contacts/>,
	'Blog': <Blog/>,
	'/': <Home/>,
	'About': <About/>,
	'Guitar': <Guitar/>,
};

export default Routes;