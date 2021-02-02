export const loadingOnPromisse = () => ({ type: 'ON_PROMISSE_LOADING' });
export const resultOnPromisse = (payload) => ({ type: 'ON_PROMISSE_SET', payload });
export const errorOnPromisse = (payload) => ({ type: 'ON_PROMISSE_ERROR', payload });
export const finishOnPromisse = () => ({ type: 'ON_PROMISSE_FINISH' });


export const templateSingOut = (auth, history) => async (dispatch) => {
    try {
        auth.signout(() => history.push("/login"));
    } catch (err) {
        console.log(err)
    }
};
