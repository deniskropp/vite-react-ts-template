import styles from './index.module.scss';
import React, {useCallback, useMemo, useState} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {
  Button, Checkbox,
  FormControl, FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment, InputLabel, Link,
  OutlinedInput, SvgIcon, Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import regex from '@/utils/regex';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as AuthBannerIcon} from '@/assets/svg/auth_banner.svg';
import {useLocalStorageState} from 'ahooks';
import request from '@/http/request';
import {TOKEN_HEADER_KEY} from '@/http/http';
import {LOGIN, REGISTER, AUTHORIZATION} from '@/router/path';

function initField() {
  return {
    value: '',
    error: false,
    helperText: '',
  };
}

interface IAuth {
  type: 'login' | 'register';
}

const Auth: React.FC<IAuth> = ({type}) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const REMEMBER_ME_DEFAULT = false;

  const [username, setUsername] = useState(initField);
  const [email, setEmail] = useState(initField);
  const [password, setPassword] = useState(() => ({...initField(), type: 'password'}));
  const [rememberMe, setRememberMe] = useLocalStorageState('rememberMe', {defaultValue: REMEMBER_ME_DEFAULT});

  const autoComplete = useMemo(() => {
    if (type == 'login') {
      return rememberMe ? 'current-password' : 'off';
    } else {
      return 'new-password';
    }
  }, [rememberMe, type]);

  // Email
  const onEmailChange = useCallback(({target: {value}}) => {
    if (value === '') {
      setEmail(prev => ({...prev, value, error: true, helperText: t('auth.email.required')}));
      return;
    }
    if (!(new RegExp(regex.email).test(value))) {
      setEmail(prev => ({...prev, value, error: true, helperText: t('auth.email.invalid')}));
      return;
    }
    setEmail(prev => ({...prev, value, error: false, helperText: ''}));
  }, [t]);

  // Password
  const onPasswordChange = useCallback(({target: {value}}) => {
    if (value === '') {
      setPassword(prev => ({...prev, value, error: true, helperText: t('auth.password.required')}));
      return;
    }
    if (!(new RegExp(regex.password).test(value))) {
      setPassword(prev => ({...prev, value, error: true, helperText: t('auth.password.invalid')}));
      return;
    }
    setPassword(prev => ({...prev, value, error: false, helperText: ''}));
  }, [t]);

  // Remember me
  const handleClickShowPassword = useCallback(() => {
    setPassword(prev => ({...prev, type: prev.type === 'password' ? 'text' : 'password'}));
  }, []);

  // Remember me
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Navigate
  const navigateTo = useCallback((e, path: string) => {
    e.preventDefault();
    navigate(path);
  }, [navigate]);

  // Handle login
  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const res = await request.login({email: email.value, password: password.value});
    if (res.token) {
      localStorage.setItem(TOKEN_HEADER_KEY, res.token);
      navigate(AUTHORIZATION);
    }
  }, [email.value, navigate, password.value]);

  // Handle register
  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    // const res = await request.register({username: username.value, email: email.value, password: password.value});
    // if (res.token) {
    //   localStorage.setItem(TOKEN_HEADER_KEY, res.token);
    //   navigate(AUTHORIZATION);
    // }
  }, [email.value, navigate, password.value, username.value]);

  return (
    <div className={styles.auth}>
      <div className={classNames(styles.container, 'flex-h')}>
        <div className={styles.bannerWrapper}>
          <div className={classNames(styles.banner)}>
            <SvgIcon component={AuthBannerIcon} viewBox={'0 0 570 584'}/>
          </div>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <Typography variant='h5'>{t('auth.welcome')}</Typography>
            { type === 'login' ?
              <div>
                <Typography variant='body2' component='span'>{t('auth.account.none')}</Typography>
                <Link
                  href={REGISTER}
                  underline="hover"
                  onClick={(e) => navigateTo(e, REGISTER)}
                >
                  {t('auth.link.register')}
                </Link>
              </div> :
              <div>
                <Typography variant='body2' component='span'>{t('auth.account.have')}</Typography>
                <Link
                  href={LOGIN}
                  underline="hover"
                  onClick={(e) => navigateTo(e, LOGIN)}
                >
                  {t('auth.link.login')}
                </Link>
              </div>
            }

            <form action="#" className={styles.formContent}>

              {/* Username */}
              { type === 'register' &&
              <FormControl className={styles.formItem}>
                <InputLabel htmlFor="username" error={username.error}>{t('auth.username.label')}</InputLabel>
                <OutlinedInput
                  id="username"
                  label={t('auth.username.label')}
                  placeholder={t('auth.username.placeholder')}
                  value={username.value}
                  error={username.error}
                  readOnly={!rememberMe || type === 'register'}
                  onFocus={(e) => e.target.readOnly = false}
                  autoComplete={autoComplete}
                  onChange={(e) => setUsername(prev => ({...prev, value: e.target.value}))}
                />
                <FormHelperText error={username.error}>{username.helperText}</FormHelperText>
              </FormControl>
              }

              {/* Email */}
              <FormControl className={styles.formItem}>
                <InputLabel htmlFor="email" error={email.error}>{t('auth.email.label')}</InputLabel>
                <OutlinedInput
                  id="email"
                  label={t('auth.email.label')}
                  placeholder={t('auth.email.placeholder')}
                  value={email.value}
                  error={email.error}
                  readOnly={!rememberMe || type === 'register'}
                  onFocus={(e) => e.target.readOnly = false}
                  autoComplete={autoComplete}
                  onChange={onEmailChange}
                />
                <FormHelperText error={email.error}>{email.helperText}</FormHelperText>
              </FormControl>

              {/* Password */}
              <FormControl className={styles.formItem}>
                <InputLabel htmlFor="password" error={password.error}>{t('auth.password.label')}</InputLabel>
                <OutlinedInput
                  id="password"
                  label={t('auth.password.label')}
                  placeholder={t('auth.password.placeholder')}
                  value={password.value}
                  type={password.type}
                  error={password.error}
                  readOnly={!rememberMe || type === 'register'}
                  onFocus={(e) => e.target.readOnly = false}
                  autoComplete={autoComplete}
                  onChange={onPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.type === 'password' ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error={password.error}>{password.helperText}</FormHelperText>
              </FormControl>

              {/* Remember me & Forgot password */}
              { type === 'login' &&
              <FormControl className={styles.rememberMe}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        value="rememberMe"
                        color="primary"
                      />
                    }
                    label={t('auth.password.remember_me')}
                  />
                </div>
                <div>
                  {/* TODO: Forgot password */}
                  <Link href='#' underline="hover">
                    {t('auth.password.forgot')}
                  </Link>
                </div>
              </FormControl>
              }

              {/* Login/Register submit */}
              { type === 'login' ?
                <FormControl>
                  <Button variant="contained" onClick={handleLogin}>{t('auth.submit.login')}</Button>
                </FormControl> :

                <FormControl className={styles.register}>
                  <Button variant="contained" onClick={handleRegister}>{t('auth.submit.register')}</Button>
                </FormControl>
              }
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Auth);
