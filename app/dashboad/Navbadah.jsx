import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
export default function Navbadah() {
  return (
    <div className='flex justify-around bg-emerald-800 h-20 text-white items-center'>
        <h1>Logo</h1>
      <div className=" flex  items-center gap-10 ">
        <ul className='flex gap-6.5'>

            <li>Home </li>
            <li>Home </li>
            <li>Home </li>
            
        </ul>
        
      <NavigationMenu >
  <NavigationMenuList >
    <NavigationMenuItem >
      <NavigationMenuTrigger className="bg-emerald-800 ">Item One</NavigationMenuTrigger>
      <NavigationMenuContent >
        <NavigationMenuLink >Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<input className='bg-white' type="search" />
<button>Favorito</button>
<button>Carrinho</button>
      </div>
  <button>Perfil</button>
    </div>
  )
}
