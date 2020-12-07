use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(IsUser)]
pub fn is_user_derive(input: TokenStream) -> TokenStream {
	let ast = parse_macro_input!(input as DeriveInput);

	let name = ast.ident;

	let code = quote! {
		use dodrio_base::IsUser;

		impl IsUser for #name {
			fn get_id(&self) -> &u32 {
				&self.id
			}

			fn get_account(&self) -> &str {
				&self.account
			}

			fn get_username(&self) -> &str {
				&self.username
			}
		}
	};

	code.into()
}
