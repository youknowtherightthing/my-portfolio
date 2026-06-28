import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CLOUD_NAME = 'dugzfzbkv'
const UPLOAD_PRESET = 'portfolio_storage'
const BIN_ID = '6a4158f9da38895dfe0c6221'
const MASTER_KEY = '$2a$10$ZAikc2ODkR.KkeAq3ptSFOYw9l6PYdhyzEkkUdpfDAX/M9Dy1iXiy'
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

const DEFAULT_FOLDERS = [
    { id: 'documents', label: 'Documents', icon: 'DOC', password: '4823' },
    { id: 'projects', label: 'Projects', icon: 'PRJ' },
    { id: 'certificates', label: 'Certificates', icon: 'CRT' },
]

async function fetchBin() {
    const res = await fetch(BIN_URL + '/latest', {
        headers: { 'X-Master-Key': MASTER_KEY }
    })
    const data = await res.json()
    return data.record
}

async function updateBin(data) {
    await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY
        },
        body: JSON.stringify(data)
    })
}

function Storage() {
    const navigate = useNavigate()
    const [activeFolder, setActiveFolder] = useState(null)
    const [folderAuth, setFolderAuth] = useState({})
    const [folderInput, setFolderInput] = useState('')
    const [folderError, setFolderError] = useState('')
    const [pendingFolder, setPendingFolder] = useState(null)
    const [files, setFiles] = useState({ documents: [], projects: [], certificates: [] })
    const [folders, setFolders] = useState(DEFAULT_FOLDERS)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [dragOver, setDragOver] = useState(false)
    const [newFolderName, setNewFolderName] = useState('')
    const [showNewFolder, setShowNewFolder] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBin().then((data) => {
            if (data.files) setFiles(data.files)
            if (data.folders) setFolders(data.folders)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const saveData = async (newFiles, newFolders) => {
        setFiles(newFiles)
        setFolders(newFolders)
        await updateBin({ files: newFiles, folders: newFolders })
    }

    const addFolder = async () => {
        if (!newFolderName.trim()) return
        const id = newFolderName.toLowerCase().replace(/\s+/g, '_')
        const newFolder = { id, label: newFolderName, icon: 'NEW' }
        const updatedFolders = [...folders, newFolder]
        const updatedFiles = { ...files, [id]: [] }
        await saveData(updatedFiles, updatedFolders)
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
        xhr.onload = async () => {
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
            await saveData(updatedFiles, folders)
            setUploading(false)
            setProgress(0)
        }
        xhr.onerror = () => { setUploading(false) }
        const fileExt = file.name.split('.').pop().toLowerCase()
        const uploadType = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt) ? 'image' : ['mp4', 'mov', 'avi'].includes(fileExt) ? 'video' : 'raw'
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${uploadType}/upload`)
        xhr.send(formData)
    }

    const handleDelete = async (fileId) => {
        if (!window.confirm('Remove this file?')) return
        const updatedFiles = {
            ...files,
            [activeFolder]: files[activeFolder].filter((f) => f.id !== fileId)
        }
        await saveData(updatedFiles, folders)
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

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <p className="text-blue-400 font-mono text-sm">Loading storage...</p>
            </div>
        )
    }

    if (pendingFolder) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
                <div className="max-w-sm w-full border border-gray-800 rounded-2xl p-8">
                    <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Protected Folder</p>
                    <h1 className="text-3xl font-extrabold mb-2">
                        <span className="text-blue-500">{pendingFolder.label}</span>
                    </h1>
                    <p className="text-gray-600 text-sm font-mono mb-8">This folder is password protected</p>
                    <input
                        type="password"
                        value={folderInput}
                        onChange={(e) => setFolderInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (folderInput === pendingFolder.password) {
                                    setFolderAuth({ ...folderAuth, [pendingFolder.id]: true })
                                    setActiveFolder(pendingFolder.id)
                                    setPendingFolder(null)
                                    setFolderInput('')
                                    setFolderError('')
                                } else {
                                    setFolderError('Wrong password. Try again!')
                                }
                            }
                        }}
                        placeholder="Enter password..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm mb-3 focus:outline-none focus:border-blue-600"
                    />
                    {folderError && <p className="text-red-500 text-xs font-mono mb-3">{folderError}</p>}
                    <button
                        onClick={() => {
                            if (folderInput === pendingFolder.password) {
                                setFolderAuth({ ...folderAuth, [pendingFolder.id]: true })
                                setActiveFolder(pendingFolder.id)
                                setPendingFolder(null)
                                setFolderInput('')
                                setFolderError('')
                            } else {
                                setFolderError('Wrong password. Try again!')
                            }
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Unlock Folder
                    </button>
                    <button
                        onClick={() => { setPendingFolder(null); setFolderInput(''); setFolderError('') }}
                        className="w-full mt-3 text-gray-600 hover:text-gray-400 text-sm font-mono transition"
                    >
                        Cancel
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
                    {folderFiles.length === 0 && <p className="text-gray-600 font-mono text-sm">No files yet.</p>}
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
                                    href={file.url.replace('/upload/', '/upload/fl_attachment/')}
                                    download={file.name}
                                    className="border border-green-700 text-green-400 hover:bg-green-950 text-xs font-mono px-3 py-2 rounded-lg transition"
>
                                    Download
                                </a> <button onClick={() => navigator.clipboard.writeText(file.url)} className="border border-gray-700 text-gray-400 hover:bg-gray-800 text-xs font-mono px-3 py-2 rounded-lg transition">Copy Link</button>
                                <button onClick={() => handleDelete(file.id)} className="border border-red-900 text-red-500 hover:bg-red-950 text-xs font-mono px-3 py-2 rounded-lg transition">Remove</button>
                            </div>
                            </div>
                        ))}
                </div>
            </div>
            </div >
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
                            onClick={() => {
                                if (folder.password && !folderAuth[folder.id]) {
                                    setPendingFolder(folder)
                                } else {
                                    setActiveFolder(folder.id)
                                }
                            }}
                            className="border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-300 font-mono text-xs font-bold mb-4">
                                {folder.icon}
                            </div>
                            <p className="text-white font-bold text-lg mb-1">{folder.label}</p>
                            <p className="text-gray-600 text-xs font-mono">
                                {(files[folder.id] || []).length} files
                                {folder.password && !folderAuth[folder.id] && (
                                    <span className="ml-2 text-blue-600">locked</span>
                                )}
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
                                <button onClick={addFolder} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition">Create</button>
                                <button onClick={() => setShowNewFolder(false)} className="flex-1 border border-gray-700 text-gray-400 text-xs font-mono py-2 rounded-lg transition">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowNewFolder(true)}
                            className="border border-dashed border-gray-700 rounded-2xl p-6 hover:border-blue-700 transition cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                            <div className="w-14 h-14 rounded-xl border border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-2xl font-bold">+</div>
                            <p className="text-gray-600 text-sm font-mono">New Folder</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Storage