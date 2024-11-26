import createHttpError from 'http-errors';
import { registerUser, loginUser, logoutUser, refreshSession, requestResetToken, getUser, patchUser } from '../services/userService.js';
import { resetPassword } from '../services/userService.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export async function registerController(req, res) {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.status(201).send({ status: 201, message: 'User registred', data: registeredUser });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(201).send({
    status: 200,
    message: 'Login completed',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function infoController(req, res, next) {
  const { user: { id: userId } } = req;
  const user = await getUser(userId);
  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }
  res.json({
    status: 200,
    message: "Successfully found user!",
    data: user,
  });
}

export const patchUserController = async (req, res, next) => {
  // const { id } = req.params;
  const { user: { id: id } } = req;


  const photo = req.file;

  console.log(photo);


  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }
  console.log(photoUrl);


  const user = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    weight: req.body.weight,
    sportHours: req.body.sportHours,
    waterNorm: req.body.waterNorm,
    photo: photoUrl,
  };

  const result = await patchUser(id, user );


  if (result === null) {
    next(createHttpError(404, 'User not found'));

    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: result.user,
  });
};


export async function logoutController(req, res) {
    const { sessionId } = req.cookies;
    console.log(req);

    if (sessionId == null){
      throw createHttpError(401, "Logout failed: You are not logged in");
    }

    if (typeof sessionId === "string"){
      await logoutUser(sessionId);
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).end();
}

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Session refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {

  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
