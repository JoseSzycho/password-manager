import { IUser } from '../../../auth/interface';
import { IEmailModel } from '../interfaces/model.interface';

/**
 * Returns the html body for a user registration email
 * @param user The user information
 * @param magicLink The registration email
 * @returns The email body
 */
export const registerModel = (user: IUser, magicLink: string): IEmailModel => {
    return {
        subject: 'KeyPass registration',
        htmlBody: `<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="border-collapse:collapse;height:100%;margin:0;padding:0;width:100%;background-color:#ffffff">
        <tbody><tr>
          <td align="center" valign="top" style="height:100%;margin:0;padding:0;width:100%;border-top:0">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
              <tbody><tr>
                <td align="center" valign="top" style="background:#f2f2f2 none no-repeat center/cover;background-color:#f2f2f2;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:16px;padding-bottom:64px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;max-width:600px!important">
                    <tbody><tr>
                      <td valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
                          <tbody><tr>
                            <td valign="top" style="padding-top:9px">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%">
                                <tbody><tr>
                                  <td valign="top" style="padding:24px 32px;color:#222222;word-break:break-word;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:150%;text-align:left;background:#ffffff;background-color:#ffffff"><span class="im">
                                    <p dir="ltr" style="color:#222;margin-bottom:24px;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:150%;font-weight:400;text-align:left">Hello ${user.firstName}</p>
      <p dir="ltr" style="color:#222;margin-bottom:24px;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:150%;font-weight:400;text-align:left">You can continue to your account by clicking this link:</p>
      <p dir="ltr" style="color:#222;margin-bottom:24px;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:150%;font-weight:400;text-align:left"><a href=${magicLink} style="display:inline-block;background:#333;color:white;padding:12px 64px;border-radius:4px;text-decoration:none;margin:0 0 24px 0" target="_blank" data-saferedirecturl=https://www.google.com/url?q=${magicLink}&amp;source=gmail&amp;ust=1708097625412000&amp;usg=AOvVaw3PBudQbPl26ew76Hojq3yb>Click to log in</a></p>
      
                                  </td><td>
                                </td></tr></tbody>
                              </table>
                            </td><td>
                          </td></tr></tbody>
                        </table>
                      </td><td>
                    </td></tr></tbody>
                  </table>
                </td><td>
              </td></tr></tbody>
            </table>
          </td><td>
        </td></tr></tbody>
      </table>`,
    };
};
