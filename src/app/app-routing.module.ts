import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [{
  path:"", redirectTo:"/recipes" , pathMatch:'full'},
  {path:"recipes", loadChildren: ()=> import('./recipes/recipes.module').then(module => module.RecipesModule)}
  // /recipes
  // /shoppingList
  ,{
    path:"shoppingList" , loadChildren : () => import('./shopping-list/shoppinglist.module').then(module=> module.ShoppingListModule)
    
  },
  {
    path:"auth" , loadChildren : () => import('./auth/auth.module').then(module=> module.AuthModule)
    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
