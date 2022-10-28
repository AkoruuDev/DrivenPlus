import logo from "../../assets/logo-name.svg";

export default function Login() {
    return(
        <>
            <img src={logo} alt="logo"/>
            <form>
                <input type="email" name="email" placeholder="E-mail" />
                <input type="password" name="password" placeholder="Senha" />
                <button>Entrar</button>
            </form>
        </>
    )
}