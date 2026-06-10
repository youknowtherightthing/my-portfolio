import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CLOUD_NAME = 'dugzfzbkv'
const UPLOAD_PRESET = 'portfolio_storage'
const PASSWORD = 'dharmesh@123'

const FOLDERS = [
    { id: 'documents', label: 'Documents', icon: 'DOC', password: 'dharmesh@123' },
    { id: 'projects', label: 'Projects', icon: 'PRJ' },
    { id: 'certificates', label: 'Certificates', icon: 'CRT' },
]

function Storage() {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [activeFolder, setActiveFolder] = useState(null)
    const [folderAuth, setFolderAuth] = useState({})
    const [folderInput, setFolderInput] = useState('')
    const [folderError, setFolderError] = useState('')
    const [pendingFolder, setPendingFolder] = useState(null)
    const [files, setFiles] = useState({ documents: [], projects: [], certificates: [] })
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [dragOver, setDragOver] = useState(false)
    const [newFolderName, setNewFolderName] = useState('')
    const [showNewFolder, setShowNewFolder] = useState(false)
    const [folders, setFolders] = useState(FOLDERS)

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('storage_auth')
        if (loggedIn) setAuth(true)
        const savedFiles = localStorage.getItem('storage_files')
        if (savedFiles) setFiles(JSON.parse(savedFiles))
        const savedFolders = localStorage.getItem('storage_folders')
        if (savedFolders) setFolders(JSON.parse(savedFolders))
    }, [])

    const handleLogin = () => {
        if (input === PASSWORD) {
            setAuth(true)
            sessionStorage.setItem('storage_auth', 'true')
            setError('')
        } else {
            setError('Wrong password. Try again!')
        }
    }

    const saveFiles = (newFiles) => {
        setFiles(newFiles)
        localStorage.setItem('storage_files', JSON.stringify(newFiles))
    }

    const saveFolders = (newFolders) => {
        setFolders(newFolders)
        localStorage.setItem('storage_folders', JSON.stringify(newFolders))
    }

    const addFolder = () => {
        if (!newFolderName.trim()) return
        const id = newFolderName.toLowerCase().replace(/\s+/g, '_')
        const newFolder = { id, label: newFolderName, icon: 'NEW' }
        const updatedFolders = [...folders, newFolder]
        saveFolders(updatedFolders)
        const updatedFiles = { ...files, [id]: [] }
        saveFiles(updatedFiles)
        setNewFolderName('')
        setShowNewFolder(false)
    }

    const handleUpload = async (file) => {
        if (!file || !activeFolder) return
        setUploading(true)
        setProgress(0)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                setProgress(Math.round((e.loaded / e.total) * 100))
            }
        }
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText)
            const newFile = {
                name: file.name,
                url: res.secure_url,
                type: file.type,
                id: res.public_id
            }
            const updatedFiles = {
                ...files,
                [activeFolder]: [...(files[activeFolder] || []), newFile]
            }
            saveFiles(updatedFiles)
            setUploading(false)
            setProgress(0)
        }
        xhr.onerror = () => {
            setUploading(false)
        }
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`)
        xhr.send(formData)
    }

    const handleDelete = (fileId) => {
        if (!window.confirm('Remove this file?')) return
        const updatedFiles = {
            ...files,
            [activeFolder]: files[activeFolder].filter((f) => f.id !== fileId)
        }
        saveFiles(updatedFiles)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleUpload(file)
    }

    const getIcon = (name) => {
        const ext = name.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'IMG'
        if (['mp4', 'mov', 'avi'].includes(ext)) return 'VID'
        if (['mp3', 'wav'].includes(ext)) return 'AUD'
        if (ext === 'pdf') return 'PDF'
        if (['doc', 'docx'].includes(ext)) return 'DOC'
        if (['zip', 'rar'].includes(ext)) return 'ZIP'
        return 'FILE'
    }

    const totalFiles = Object.values(files).reduce((a, b) => a + b.length, 0)

    if (!auth) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
                <div className="max-w-sm w-full border border-gray-800 rounded-2xl p-8">
                    <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Protected</p>
                    <h1 className="text-3xl font-extrabold mb-2">Enter <span className="text-blue-500">Password</span></h1>
                    <p className="text-gray-600 text-sm font-mono mb-8">This page is private</p>
                    <input
                        type="password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="Enter password..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm mb-3 focus:outline-none focus:border-blue-600"
                    />
                    {error && <p className="text-red-500 text-xs font-mono mb-3">{error}</p>}
                    <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                        Unlock Storage
                    </button>
                    <button onClick={() => navigate('/')} className="w-full mt-3 text-gray-600 hover:text-gray-400 text-sm font-mono transition">
                        Back to Portfolio
                    </button>
                </div>
            </div>
        )
    }

    if (activeFolder) {
        const folderFiles = files[activeFolder] || []
        const folderLabel = folders.find(f => f.id === activeFolder)?.label

        return (
            <div className="bg-black text-white min-h-screen px-6 py-16">
                <div className="max-w-4xl mx-auto">

                    <button onClick={() => setActiveFolder(null)} className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition">
                        Back to Folders
                    </button>

                    <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Folder</p>
                    <h1 className="text-5xl font-extrabold mb-4"><span className="text-blue-500">{folderLabel}</span></h1>
                    <div className="border-t border-gray-800 mb-10 w-24"></div>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-10 text-center mb-10 transition ${dragOver ? 'border-blue-500 bg-blue-950' : 'border-gray-700 hover:border-blue-700'}`}
                    >
                        <p className="text-gray-400 font-mono text-sm mb-4">Drag and drop any file here</p>
                        <p className="text-gray-600 font-mono text-xs mb-6">or</p>
                        <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition">
                            Browse File
                            <input type="file" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} />
                        </label>
                        {uploading && (
                            <div className="mt-6">
                                <p className="text-blue-400 font-mono text-sm mb-2">Uploading... {progress}%</p>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-blue-400 text-xs font-mono tracking-widest mb-6">Files ({folderFiles.length})</p>
                    {folderFiles.length === 0 && <p className="text-gray-600 font-mono text-sm">No files in this folder yet.</p>}

                    <div className="flex flex-col gap-4">
                        {folderFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between border border-gray-800 rounded-2xl p-4 hover:border-blue-700 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-300 font-mono text-xs font-bold flex-shrink-0">
                                        {getIcon(file.name)}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{file.name}</p>
                                        <p className="text-gray-600 text-xs font-mono">Stored on Cloudinary</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="border border-blue-700 text-blue-400 hover:bg-blue-900 text-xs font-mono px-3 py-2 rounded-lg transition">Open</a>
                                    <button onClick={() => navigator.clipboard.writeText(file.url)} className="border border-gray-700 text-gray-400 hover:bg-gray-800 text-xs font-mono px-3 py-2 rounded-lg transition">Copy Link</button>
                                    <button onClick={() => handleDelete(file.id)} className="border border-red-900 text-red-500 hover:bg-red-950 text-xs font-mono px-3 py-2 rounded-lg transition">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-4xl mx-auto">

                <button onClick={() => navigate('/')} className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition">
                    Back to Portfolio
                </button>

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">My Storage</p>
                <h1 className="text-5xl font-extrabold mb-4">File <span className="text-blue-500">Storage</span></h1>
                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <p className="text-blue-400 text-xs font-mono tracking-widest mb-6">
                    Folders ({folders.length}) · Total Files ({totalFiles})
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            onClick={() => setActiveFolder(folder.id)}
                            className="border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-300 font-mono text-xs font-bold mb-4">
                                {folder.icon}
                            </div>
                            <p className="text-white font-bold text-lg mb-1">{folder.label}</p>
                            <p className="text-gray-600 text-xs font-mono">
                                {(files[folder.id] || []).length} files
                            </p>
                        </div>
                    ))}

                    {showNewFolder ? (
                        <div className="border border-blue-700 rounded-2xl p-6">
                            <p className="text-blue-400 text-xs font-mono tracking-widest mb-3">New Folder</p>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addFolder()}
                                placeholder="Folder name..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white font-mono text-sm mb-3 focus:outline-none focus:border-blue-600"
                            />
                            <div className="flex gap-2">
                                <button onClick={addFolder} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition">
                                    Create
                                </button>
                                <button onClick={() => setShowNewFolder(false)} className="flex-1 border border-gray-700 text-gray-400 text-xs font-mono py-2 rounded-lg transition">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowNewFolder(true)}
                            className="border border-dashed border-gray-700 rounded-2xl p-6 hover:border-blue-700 transition cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                            <div className="w-14 h-14 rounded-xl border border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-2xl font-bold">
                                +
                            </div>
                            <p className="text-gray-600 text-sm font-mono">New Folder</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Storage