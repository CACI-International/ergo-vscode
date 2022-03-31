import { ExtensionContext, workspace } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const command: string = workspace.getConfiguration("ergo").get("binary") ?? "ergolang";

	const serverOptions: ServerOptions = {
		command: command,
		args: ["lsp"],
		transport: TransportKind.stdio
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'ergo' }],
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'ergoLspClient',
		'Ergo LSP Client',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
