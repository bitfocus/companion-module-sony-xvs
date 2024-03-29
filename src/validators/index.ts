import { xvsInstance } from '../main.js'
import { INCOMING_AUX_XPT } from './INCOMING_AUX_XPT.js'
import { INCOMING_FM_XPT } from './INCOMING_FM_XPT.js'
import { INCOMING_ME_XPT } from './INCOMING_ME_XPT.js'
import { INCOMING_SOURCE_NAME } from './INCOMING_SOURCE_NAME.js'
import { INCOMING_GPI } from './INCOMING_GPI.js'
import { INCOMING_GPO } from './INCOMING_GPO.js'

type CommandHandler = (self: xvsInstance, buffer: Buffer) => boolean

const handlers: CommandHandler[] = [
	INCOMING_FM_XPT,
	INCOMING_AUX_XPT,
	INCOMING_ME_XPT,
	INCOMING_SOURCE_NAME,
	INCOMING_GPI,
	INCOMING_GPO,
]

export function INCOMING_HANDLE(self: xvsInstance, buffer: Buffer): void {
	for (const handler of handlers) {
		if (handler(self, buffer)) {
			return
		}
	}
	console.log('UNKNOWN COMMAND>', buffer)
}
