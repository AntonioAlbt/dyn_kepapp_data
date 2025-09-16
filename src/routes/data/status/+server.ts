// dyn_kepapp_data: service for uploading logs
// Copyright (c) 2025 Antonio Albert

// This file is part of dyn_kepapp_data.

// dyn_kepapp_data is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// dyn_kepapp_data is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with dyn_kepapp_data.  If not, see <http://www.gnu.org/licenses/>.

// Diese Datei ist Teil von dyn_kepapp_data.

// dyn_kepapp_data ist Freie Software: Sie können es unter den Bedingungen
// der GNU General Public License, wie von der Free Software Foundation,
// Version 3 der Lizenz oder (nach Ihrer Wahl) jeder neueren
// veröffentlichten Version, weiter verteilen und/oder modifizieren.

// dyn_kepapp_data wird in der Hoffnung, dass es nützlich sein wird, aber
// OHNE JEDE GEWÄHRLEISTUNG, bereitgestellt; sogar ohne die implizite
// Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.
// Siehe die GNU General Public License für weitere Details.

// Sie sollten eine Kopie der GNU General Public License zusammen mit
// dyn_kepapp_data erhalten haben. Wenn nicht, siehe <https://www.gnu.org/licenses/>.

import { LATEST_KEPLER_APP_VERSION_CODE_ANDROID, LATEST_KEPLER_APP_VERSION_CODE_IOS, LATEST_KEPLER_APP_VERSION_NAME_ANDROID, LATEST_KEPLER_APP_VERSION_NAME_IOS, npm_package_version } from "$env/static/private"
import { json } from "@sveltejs/kit"
import { parse as semverParse } from "semver"

export async function GET({ url }) {
    const ver = semverParse(npm_package_version);

    const deviceData = {
        os: { type: url.searchParams.get("os"), version: url.searchParams.get("osver") },
        app: { version: url.searchParams.get("appver"), code: Number(url.searchParams.get("appvercode") ?? 0) },
    };
    let appVer: { name: string, code: number };
    if (deviceData.app.code >= 86) {
        switch (deviceData.os.type) {
            case "ios":
                appVer = {
                    name: LATEST_KEPLER_APP_VERSION_NAME_IOS,
                    code: Number(LATEST_KEPLER_APP_VERSION_CODE_IOS),
                };
                break;
            case "android":
                appVer = {
                    name: LATEST_KEPLER_APP_VERSION_NAME_ANDROID,
                    code: Number(LATEST_KEPLER_APP_VERSION_CODE_ANDROID),
                };
                break;
            default: appVer = { name: deviceData.app.version ?? LATEST_KEPLER_APP_VERSION_NAME_ANDROID, code: deviceData.app.code };
        }
    } else {
        appVer = {
            name: LATEST_KEPLER_APP_VERSION_NAME_ANDROID,
            code: Number(LATEST_KEPLER_APP_VERSION_CODE_ANDROID),
        };
    }
    return json(
        {
            service: "dyn_kepapp_data",
            version: {
                string: npm_package_version,
                major: ver?.major,
                minor: ver?.minor,
                patch: ver?.patch
            },
            app_version: appVer,
            services: {
                sommerfest: {
                    available: false
                }
            }
        }
    )
}
