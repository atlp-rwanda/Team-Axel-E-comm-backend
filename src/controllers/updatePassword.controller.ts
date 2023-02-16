import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../db/schemas/user.schema';

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;
    if (
      currentPassword.length < 8 ||
      newPassword.length < 8 ||
      newPasswordConfirmation.length < 8
    )
      {throw new Error('password is vey short, try more than 8 characters');}

    if (newPassword !== newPasswordConfirmation)
      {throw new Error(
        'password missmatch, newpassword and confimation password are not the same'
      );}

    if (!bcrypt.compareSync(currentPassword, req.user.password))
      {throw new Error(
        'you may have forgoten your password, enter your old pasword correctly'
      );}
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await User.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );
    res.status(200).json({
      message: 'passwoed updated successfull',
      statusCode: 200,
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).send({ error: error.message });
  }
};
