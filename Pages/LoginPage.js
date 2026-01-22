import { test, expect } from '@playwright/test';
import cluster from 'node:cluster'; cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} died`); });

exports.LoginPage=class LoginPage{
    constructor(page){
        this.page=page
        this.username_textbox=page.getByRole('textbox', { name: 'Username' })
        this.password_textbox=page.getByRole('textbox', { name: 'Password' })
        this.login_button=page.getByRole('button', { name: 'Sign In' })
  };
  async gotopage(page){
      await page.goto('https://uibank.uipath.com/login');
  }
  async login(Username,Password){
   await  this.username_textbox.click();
   await  this.username_textbox.fill(Username);
   await  this.password_textbox.click();
   await this.password_textbox.fill(Password);
   await this.login_button.click();
  
  }   
    async errormsg(page){
 await expect(page.getByText('login failed')).toBeVisible();
    }
   
};