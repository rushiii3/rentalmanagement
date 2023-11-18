const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    Subject: "Activate Your Rent Me Account to Start Renting Your Dream Home!",
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>
          
            <style type="text/css">
              @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
        
          .u-row .u-col-50 {
            width: 300px !important;
          }
        
          .u-row .u-col-100 {
            width: 600px !important;
          }
        
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } #u_content_text_4 a { color: #f0c30d; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 19% !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 20px 20px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_text_2 .v-container-padding-padding { padding: 20px 20px 60px !important; } #u_content_text_4 .v-container-padding-padding { padding: 60px 20px !important; } #u_content_heading_2 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_heading_2 .v-text-align { text-align: center !important; } #u_content_social_1 .v-container-padding-padding { padding: 10px 10px 10px 98px !important; } #u_content_text_5 .v-container-padding-padding { padding: 10px 20px 30px !important; } #u_content_text_5 .v-text-align { text-align: center !important; } }
            </style>
          
          
        
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
            
          
          
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
          
        <table id="u_content_image_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:23px 10px 49px;font-family:'Open Sans',sans-serif;" align="left">
                
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
              
              <img align="center" border="0" src="https://i.ibb.co/b26sP9h/image-4.png" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 14%;max-width: 81.2px;" width="81.2" class="v-src-width v-src-max-width"/>
              
            </td>
          </tr>
        </table>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
          
        
        
          
          
            <!--[if gte mso 9]>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                <tr>
                  <td background="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" valign="top" width="100%">
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456088977-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
              <![endif]-->
          
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://i.ibb.co/sV9tvPq/image-6.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-6.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
          
        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-text-align" style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 20px; line-height: 34px;"><strong><span style="line-height: 34px; font-size: 20px;">Hi ${options.firstname},</span></strong></span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 20px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-text-align" style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 16px; line-height: 27.2px;">Please Verify that your email address is </span><span style="font-size: 16px; line-height: 27.2px;">${options.email} and that you entered it when </span><span style="font-size: 16px; line-height: 27.2px;">signing up for Rent Me.</span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_button_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                
          <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
        <div class="v-text-align" align="center">
          <!--[if mso]><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" bgcolor="#000000" style="padding:10px 20px;" valign="top"><![endif]-->
            <a href=${options.activationURL} target="_blank" class="v-button v-size-width" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #000000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:50%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
              <span style="display:block;padding:10px 20px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">Verify Account</span></strong></span></span>
            </a>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_text_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 100px 60px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-text-align" style="font-size: 14px; color: #000000; line-height: 170%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 170%;">Once you've activated your account, you'll gain access to a diverse range of homes, each waiting to become someone's dream space. Whether you're seeking a cozy apartment, a spacious house, or a stylish condo, Rent Me has options to suit every taste and budget.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
          
            <!--[if gte mso 9]>
              </v:textbox></v:rect>
            </td>
            </tr>
            </table>
            <![endif]-->
            
        
        
          
          
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
          
        <table id="u_content_text_4" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 80px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-text-align" style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 170%;">Need help? <a rel="noopener" href="https://www.unlayer.com" target="_blank">Contact our support team</a> or hit us on Twitter <span style="text-decoration: underline; line-height: 23.8px;"><span style="background-color: #000000; line-height: 23.8px; color: #f1c40f; text-decoration: underline;"><a rel="noopener" href="https://www.unlayer.com" target="_blank" style="background-color: #000000; color: #f1c40f; text-decoration: underline;">@</a>rentme</span></span>. Want to give us feedback? Let us know what you think on our <a rel="noopener" href="https://www.unlayer.com" target="_blank">feedback site</a>.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
          
        
        
          
          
            <!--[if gte mso 9]>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                <tr>
                  <td background="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" valign="top" width="100%">
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1662456866997-back2.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
              <![endif]-->
          
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://i.ibb.co/WK3R57j/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #f1c40f;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
          <div style="background-color: #f1c40f;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
          
        <table id="u_content_heading_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 0px 50px;font-family:'Open Sans',sans-serif;" align="left">
                
          <h1 class="v-text-align" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: 'Rubik',sans-serif; font-size: 22px; font-weight: 400;"><div>
        <div><strong>Rent ME</strong></div>
        </div></h1>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_social_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px 50px;font-family:'Open Sans',sans-serif;" align="left">
                
        <div align="left">
          <div style="display: table; max-width:140px;">
          <!--[if (mso)|(IE)]><table width="140" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:140px;"><tr><![endif]-->
          
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="https://facebook.com/" title="Facebook" target="_blank">
                  <img src="https://i.ibb.co/pZmvRpc/image-1.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="https://instagram.com/" title="Instagram" target="_blank">
                  <img src="https://i.ibb.co/J2tmgG7/image-2.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                  <img src="https://i.ibb.co/gvPvJFy/image-3.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                </a>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td><![endif]-->
            
            
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #f1c40f;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
          <div style="background-color: #f1c40f;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
          
        <table id="u_content_text_5" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:31px 50px 30px 10px;font-family:'Open Sans',sans-serif;" align="left">
                
          <div class="v-text-align" style="font-size: 14px; line-height: 170%; text-align: right; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 170%;">Where Dream Homes</p>
        <p style="font-size: 14px; line-height: 170%;">Await Your Arrival!</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
          
            <!--[if gte mso 9]>
              </v:textbox></v:rect>
            </td>
            </tr>
            </table>
            <![endif]-->
            
        
        
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
          </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>
        `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
