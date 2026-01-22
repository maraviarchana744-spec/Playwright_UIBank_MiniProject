import { test, expect } from '@playwright/test';
import cluster from 'node:cluster'; cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} died`); });
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
import { ApplyLoan } from '../Pages/ApplyLoan';
import { TransferFunds } from '../Pages/TransferFunds';

test.describe('All', () => {

    test('verify unable to login with wrong password', async ({ page, context }) => {
        const login = new LoginPage(page)
        await login.gotopage(page);
        await login.login('Archana15', 'Domain@120');
        await context.tracing.start({ snapshots: true, screenshots: true })
        await login.errormsg(page);
        await context.tracing.stop({ path: 'test.trace1.zip' })

    })
    test('verify user not able to login with wrong username and correct password', async ({ page, context }) => {
        const login2 = new LoginPage(page)
        await login2.gotopage(page)
        await login2.login('Archana', 'Archana@123')
        await context.tracing.start({ snapshots: true, screenshots: true })
        await login2.errormsg(page)
        await context.tracing.stop({ path: 'test.trace2.zip' })

    })

    test('verify able to login by correct username and password', async ({ page, context }) => {
        const login3 = new LoginPage(page)
        await login3.gotopage(page)
        await login3.login('Archana15', 'Archana@123')
        // const homepage=new HomePage(page)
        await context.tracing.start({ snapshots: true, screenshots: true })

        await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();
        context.tracing.stop({ path: 'test.trace3.zip' })


    })

})

test.describe('After login', () => {
    test.beforeEach('login', async ({ page }) => {
        const login4 = new LoginPage(page)
        await login4.gotopage(page)
        await login4.login('Archana15', 'Archana@123')
        // const homepage=new HomePage(page)
        //await context.tracing.start({snapshots:true,screenshots:true})

        await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();
        //context.tracing.stop({path:'test.trace3.zip'})

    })
    test('verifying homepage content', async ({ page }) => {


        const homepage = new HomePage(page)
        await homepage.optionsvisible();
    })
    test('verifying able to click transfer money and able to transfer fund', async ({ page }) => {
        const homepage = new HomePage(page);
        //context.tracing.start({ snapshots: true, screenshots: true })
        await homepage.clickTransfermoney();
        const transfer = new TransferFunds(page);
        await transfer.transfermoney();

        //context.tracing.stop({ path: 'test.trace4.zip' })

    })

    test('verify able to click apply loan and applying', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.clickApplyLoan();
        //context.tracing.start({ snapshots: true, screenshots: true })
        const applyloan = new ApplyLoan(page)
        await applyloan.applyingLoan();

        //context.tracing.stop({ path: 'test.trace5.zip' })

    })
   

})
test.describe('menu', async () => {
    test.beforeEach('login', async ({ page }) => {
        const login4 = new LoginPage(page)
        await login4.gotopage(page)
        await login4.login('Archana15', 'Archana@123')
        // const homepage=new HomePage(page)
        //await context.tracing.start({snapshots:true,screenshots:true})

        await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();
        //context.tracing.stop({path:'test.trace3.zip'})

    })
    test('verify after clicking products loans,credit card and net banking are visible', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.ProductOptionVisible();

    })
    test('verify after clicking profile ,profile details are visible',async({page})=>{
        const homepage=new HomePage(page);
        await homepage.ProfileDetails();
    })
    test('verify user is able to logout succcessfully',async({page})=>{
        const homepage=new HomePage(page);
        await homepage.LogoutSuccessfully();
    })



})